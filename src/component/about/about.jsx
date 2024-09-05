import * as React from "react";
import { useState } from "react";

function About() {
  const [Our, setOur] = useState(() => null);

  return (
    <div id="about" className="container mx-auto">
      <div className="mt-10 flex flex-col md:flex-row md:gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex justify-center md:w-1/2">
          <img
            loading="lazy"
            srcSet="https://sun9-27.userapi.com/impg/_bwLIdhKr8tgKQ7uZti4So9UJJHCIXof3wubzQ/7gC_CiEvmYk.jpg?size=350x250&quality=96&sign=42a1cd2d4e6d91d4bda6a3431a7418b4&type=album"
            className="w-full max-w-[350px] md:max-w-none aspect-w-2 aspect-h-1"
          />
        </div>
        <div className="flex flex-col justify-center md:w-1/2 md:ml-5">
          <div className="px-5 text-center md:text-left">
            <div className="text-5xl font-bold leading-[69.16px] max-md:text-4xl">
              О нас
            </div>
            <div className="mt-5 text-lg leading-7">
              Компания "Прогрессивная Недвижимость" была основана в Приднестровской Молдавской Республике (ПМР) в 2005 году группой энтузиастов, желавших изменить стандарты рынка недвижимости в регионе. Начав с небольшого офиса в центре Тирасполя, компания стремительно расширила свою деятельность благодаря высокому качеству обслуживания и инновационному подходу к риэлторской деятельности.

              Благодаря команде профессионалов, прекрасному знанию рынка и прозрачной работе с клиентами, "Прогрессивная Недвижимость" стала ведущим агентством на рынке недвижимости ПМР. Они специализируются на продаже, покупке и аренде коммерческой и жилой недвижимости во всех регионах республики.

              В настоящее время компания "Прогрессивная Недвижимость" активно развивается, расширяя свою клиентскую базу и предлагая новые инновационные услуги, чтобы удовлетворить потребности разнообразных клиентов в сфере недвижимости.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
