import React from "react";
import { stageDescriptionData, icons, carouselImages } from "../constants/stagerData";
import FundingBreakdownMobile from "./FundingBreakdownMobile";
import { CustomCarouselModule } from "./components/Carousel";
import { CarouselModal } from "./components/CarouselModal";
import { CustomCarousel } from "./CustomCarousel";
import { IProduct } from "@/shared/types/product.interface";

interface StageDescriptionMobileProps {
    products: IProduct;
}

const StageDescriptionMobile: React.FC<StageDescriptionMobileProps> = ({ products }) => {
    return (
        <div id="overview" className="bg-[#000000] px-[20px] w-full flex flex-col items-start lg:items-center font-heebo">
            <div>
                <h2 className="text-[24px] text-[#FFFFFF] mb-5 font-semibold font-ekMukta leading-[1] mt-[40px]">
                    {stageDescriptionData.stageTitle}
                </h2>
                <p className="text-[#CDCDCD] w-full text-[16px] font-ekMukta mb-5 leading-[1.3]">
                    {stageDescriptionData.stageHistory}
                </p>

                <CustomCarousel product={products} />
                </div>

            <div>
                <h2 className="text-[24px] text-[#FFFFFF] font-semibold font-ekMukta mb-5 mt-10 leading-[1]">
                    {stageDescriptionData.fundingTitle}
                </h2>
                <div className="font-ekMukta text-[#CDCDCD] text-[16px] leading-[1.4] mb-5">
                    {stageDescriptionData.fundingProgress}
                </div>

                <CarouselModal icons={icons} />

                <div className="font-ekMukta">
                    <div className="mt-5 mb-10">
                        <FundingBreakdownMobile product={products} />
                        <h3 className="text-[#CDCDCD] text-[16px] mt-5 mb-5 leading-[1.4]">
                            {stageDescriptionData.info}
                        </h3>
                        <CustomCarouselModule carouselImages={carouselImages} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                ul.list-small li::marker {
                    font-size: 0.7em;
                }
            `}</style>
        </div>
    );
};

export default StageDescriptionMobile;
