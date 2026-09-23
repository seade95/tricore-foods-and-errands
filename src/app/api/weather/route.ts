import type { WeatherData } from "@/lib/weather";

export const dynamic = "force-dynamic";

const FALLBACK = {
  lat: 6.5244,
  lon: 3.3792,
  city: "Lagos",
  country: "Nigeria",
};

function clientIp(request: Request): string | null {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const ip = fwd.split(",")[0].trim();
    if (ip) return ip;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  return real || null;
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    ip.startsWith("fc") ||
    ip.startsWith("fd")
  );
}

async function ipGeolocation(ip: string | null): Promise<{
  lat: number;
  lon: number;
  city: string;
  country: string;
} | null> {
  if (!ip || isPrivateIp(ip)) return null;
  try {
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.success) return null;
    const lat = Number(data.latitude);
    const lon = Number(data.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return {
      lat,
      lon,
      city: String(data.city || ""),
      country: String(data.country || ""),
    };
  } catch {
    return null;
  }
}

async function reverseGeocode(
  lat: number,
  lon: number
): Promise<{ city: string; country: string }> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return { city: "", country: "" };
    const data = await res.json();
    return {
      city: String(data.city || data.locality || ""),
      country: String(data.countryName || ""),
    };
  } catch {
    return { city: "", country: "" };
  }
}

async function fetchWeather(
  lat: number,
  lon: number
): Promise<Omit<WeatherData, "city" | "country" | "lat" | "lon" | "source"> | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day` +
      `&timezone=auto`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    const cur = data?.current;
    if (!cur || typeof cur.temperature_2m !== "number") return null;
    return {
      temperature: cur.temperature_2m,
      feelsLike: Number(cur.apparent_temperature ?? cur.temperature_2m),
      humidity: Number(cur.relative_humidity_2m ?? 0),
      windSpeed: Number(cur.wind_speed_10m ?? 0),
      weatherCode: Number(cur.weather_code ?? 0),
      isDay: Number(cur.is_day ?? 1) === 1,
    };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  let lat = Number(latParam);
  let lon = Number(lonParam);
  let city = "";
  let country = "";
  let source: WeatherData["source"] = "ip";

  const hasCoords =
    latParam !== null &&
    lonParam !== null &&
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180;

  if (hasCoords) {
    source = "gps";
    const geo = await reverseGeocode(lat, lon);
    city = geo.city;
    country = geo.country;
  } else {
    const geo = await ipGeolocation(clientIp(request));
    if (geo) {
      lat = geo.lat;
      lon = geo.lon;
      city = geo.city;
      country = geo.country;
      source = "ip";
    } else {
      lat = FALLBACK.lat;
      lon = FALLBACK.lon;
      city = FALLBACK.city;
      country = FALLBACK.country;
      source = "fallback";
    }
  }

  const weather = await fetchWeather(lat, lon);
  if (!weather) {
    return Response.json({ error: "Weather service unavailable" }, { status: 502 });
  }

  const payload: WeatherData = {
    city: city || (source === "fallback" ? FALLBACK.city : "Your area"),
    country,
    lat,
    lon,
    ...weather,
    source,
  };

  return Response.json(payload, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
  });
}
