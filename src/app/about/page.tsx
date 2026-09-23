import { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/store";
import { Target, Eye, Heart, Lightbulb, Users, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us",
    description: "Learn about Tricore Foods and Errands - our mission, vision, values and story.",
  };
}

const valueIcons: Record<string, React.ElementType> = { Heart, Lightbulb, Users, MapPin };

export default function AboutPage() {
  const content = getContent();
  const a = content.about || {};
  const whatsapp = content.whatsapp || { number: "+234XXXXXXXXXX", message: "" };
  const values = (a.values || []).map((v: any) => ({
    icon: valueIcons[v.icon] || Heart,
    title: v.title,
    description: v.description,
  }));

  return (
    <>
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tricore-black via-tricore-gray-900 to-tricore-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url(${a.heroImage})` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{a.heroTag}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">{a.heroHeading}</h1>
            <p className="text-tricore-gray-400 text-lg leading-relaxed">{a.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-6">{a.storyHeading}</h2>
              {(a.storyParagraphs || []).map((p: string, i: number) => (
                <p key={i} className="text-tricore-gray-600 text-base leading-relaxed mb-5">{p}</p>
              ))}
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={a.storyImage} alt="Team collaboration" className="w-full h-[450px] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-tricore-gray-100 hidden sm:block">
                <p className="text-tricore-red text-3xl font-bold">1</p>
                <p className="text-tricore-gray-600 text-xs">Trusted Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-tricore-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-tricore-red" />
              </div>
              <h3 className="font-bold text-tricore-black text-xl mb-3">Our Mission</h3>
              <p className="text-tricore-gray-600 text-sm leading-relaxed">{a.mission}</p>
            </div>
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-tricore-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-tricore-red" />
              </div>
              <h3 className="font-bold text-tricore-black text-xl mb-3">Our Vision</h3>
              <p className="text-tricore-gray-600 text-sm leading-relaxed">{a.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: any) => (
              <div key={value.title} className="bg-tricore-gray-50 rounded-2xl p-7 border border-tricore-gray-200 hover:border-tricore-red/30 hover:shadow-lg transition-all duration-300 group text-center">
                <div className="w-14 h-14 bg-tricore-red-light rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-tricore-red group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-tricore-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-tricore-black mb-2">{value.title}</h3>
                <p className="text-tricore-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-tricore-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={a.philosophyImage} alt="Service philosophy" className="w-full h-[400px] object-cover" loading="lazy" />
              </div>
            </div>
            <div>
              <p className="text-tricore-red font-semibold text-xs uppercase tracking-[0.25em] mb-3">{a.philosophyTag}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-tricore-black mb-6">{a.philosophyHeading}</h2>
              <p className="text-tricore-gray-600 text-base leading-relaxed mb-8">{a.philosophyDescription}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(a.philosophyPillars || []).map((pillar: string) => (
                  <div key={pillar} className="bg-white rounded-xl p-4 border border-tricore-gray-200 text-center">
                    <span className="font-semibold text-tricore-black text-sm">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-tricore-black mb-4">{a.leadershipHeading}</h2>
          <p className="text-tricore-gray-600 text-sm">{a.leadershipText}</p>
        </div>
      </section>

      <CTASection whatsapp={whatsapp} />
    </>
  );
}
