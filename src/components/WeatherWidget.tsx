"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Crosshair,
  Loader2,
} from "lucide-react";
import { weatherCodeLabel, type WeatherData } from "@/lib/weather";

const CACHE_KEY = "tricore:weather:v1";
const IP_TTL_MS = 10 * 60 * 1000;
const GPS_TTL_MS = 30 * 60 * 1000;

interface CacheEntry {
  t: number;
  data: WeatherData;
}

function readCache(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed?.data || typeof parsed.t !== "number") return null;
    const ttl = parsed.data.source === "gps" ? GPS_TTL_MS : IP_TTL_MS;
    if (Date.now() - parsed.t > ttl) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: WeatherData) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ t: Date.now(), data })
    );
  } catch {
    // storage full / private mode — ignore
  }
}

const WEATHER_ICONS = {
  sun: Sun,
  moon: Moon,
  cloud: Cloud,
  cloudSun: CloudSun,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
  fog: CloudFog,
} as const;

type WeatherIconKey = keyof typeof WEATHER_ICONS;

function iconKeyFor(code: number, isDay: boolean): WeatherIconKey {
  if (code === 0 || code === 1) return isDay ? "sun" : "moon";
  if (code === 2) return "cloudSun";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "storm";
  return "cloud";
}

async function loadWeather(coords?: {
  lat: number;
  lon: number;
}): Promise<WeatherData> {
  const qs = coords ? `?lat=${coords.lat}&lon=${coords.lon}` : "";
  const res = await fetch(`/api/weather${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`weather ${res.status}`);
  return (await res.json()) as WeatherData;
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "hidden" | "locating">(
    "loading"
  );
  const [gpsError, setGpsError] = useState<string | null>(null);

  const apply = useCallback((next: WeatherData) => {
    setData(next);
    writeCache(next);
    setStatus("ready");
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cached = readCache();
      if (cached) {
        if (cancelled) return;
        setData(cached.data);
        setStatus("ready");
        if (cached.data.source === "gps") return;
      }

      try {
        const next = await loadWeather();
        if (!cancelled) apply(next);
      } catch {
        if (!cancelled && !cached) setStatus("hidden");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apply]);

  const usePreciseLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGpsError("Location not supported");
      return;
    }
    setGpsError(null);
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const next = await loadWeather({
            lat: Number(pos.coords.latitude.toFixed(4)),
            lon: Number(pos.coords.longitude.toFixed(4)),
          });
          apply(next);
        } catch {
          setGpsError("Weather lookup failed");
          setStatus(data ? "ready" : "hidden");
        }
      },
      (err) => {
        setGpsError(
          err.code === err.PERMISSION_DENIED
            ? "Permission denied"
            : "Location unavailable"
        );
        setStatus(data ? "ready" : "hidden");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 10 * 60 * 1000 }
    );
  }, [apply, data]);

  if (status === "hidden" && !data) return null;

  if (!data) {
    return (
      <div
        className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-tricore-gray-50 border border-tricore-gray-100 min-w-[5.5rem] justify-center"
        aria-hidden
      >
        <Loader2 className="w-3.5 h-3.5 animate-spin text-tricore-gray-400" />
        <span className="text-xs text-tricore-gray-400 font-medium">Weather</span>
      </div>
    );
  }

  const label = weatherCodeLabel(data.weatherCode);
  const title = `${label} · feels ${Math.round(data.feelsLike)}° · humidity ${data.humidity}% · wind ${Math.round(data.windSpeed)} km/h${gpsError ? ` · ${gpsError}` : ""}`;
  const WeatherIcon = WEATHER_ICONS[iconKeyFor(data.weatherCode, data.isDay)];

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-tricore-gray-50 border border-tricore-gray-100 text-tricore-gray-700"
      title={title}
      aria-label={`Weather: ${Math.round(data.temperature)} degrees, ${label}, ${data.city}`}
    >
      <WeatherIcon className="w-4 h-4 text-tricore-red shrink-0" aria-hidden />
      <span className="text-sm font-bold text-tricore-black tabular-nums leading-none">
        {Math.round(data.temperature)}°
      </span>
      <span className="hidden sm:inline text-xs text-tricore-gray-500 max-w-[6.5rem] truncate leading-none">
        {data.city}
      </span>
      <button
        type="button"
        onClick={usePreciseLocation}
        disabled={status === "locating"}
        className="p-0.5 rounded-full text-tricore-gray-400 hover:text-tricore-red transition-colors disabled:opacity-50"
        aria-label="Use precise location"
        title={
          status === "locating"
            ? "Getting your location…"
            : "Use my precise location"
        }
      >
        {status === "locating" ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden />
        ) : (
          <Crosshair className="w-3.5 h-3.5" aria-hidden />
        )}
      </button>
    </div>
  );
}
