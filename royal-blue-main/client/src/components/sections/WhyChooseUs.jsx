import { FaShieldAlt, FaRupeeSign, FaMoon, FaBroom, FaBolt, FaWifi, FaHandHoldingWater, FaFingerprint, FaVideo, FaUserTie } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

const reasons = [
  { title: 'Safe Environment', icon: FaShieldAlt, desc: 'Exclusively for women with strict security protocols and 24×7 monitoring.' },
  { title: 'Affordable Pricing', icon: FaRupeeSign, desc: 'Premium facilities at budget-friendly rates — no hidden charges.' },
  { title: 'Peaceful Atmosphere', icon: FaMoon, desc: 'Quiet study spaces and noise-free zones for focused living.' },
  { title: 'Daily Cleaning & Power Backup', icon: FaBroom, desc: 'Professional housekeeping every day with uninterrupted 24×7 power supply.' },
  { title: 'High Speed WiFi & Biometric Entry', icon: FaWifi, desc: 'Fast reliable internet and access-controlled biometric entry for residents only.' },
];

const iconColors = [
  'text-blue-500', 'text-yellow-500', 'text-indigo-500', 'text-green-500', 'text-purple-500',
];

const cardBgs = [
  'bg-blue-50 dark:bg-blue-950/30',
  'bg-yellow-50 dark:bg-yellow-950/30',
  'bg-indigo-50 dark:bg-indigo-950/30',
  'bg-green-50 dark:bg-green-950/30',
  'bg-purple-50 dark:bg-purple-950/30',
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          title="Why Choose Us"
          subtitle="We pride ourselves on providing the best possible living experience for girls away from home."
        />
      </div>

      <div className="w-full">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={80}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.88}
        >
          {reasons.map((reason, i) => (
            <ScrollStackItem
              key={i}
              itemClassName={`${cardBgs[i]} border border-gray-100 dark:border-dark-border`}
            >
              <div className="flex flex-row items-center gap-3 md:gap-6 h-full">
                <div className="w-10 h-10 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-white dark:bg-dark-card shadow-md flex items-center justify-center">
                  <reason.icon className={`text-xl md:text-3xl ${iconColors[i]}`} />
                </div>
                <div>
                  <h3 className="text-base md:text-xl lg:text-2xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default WhyChooseUs;
