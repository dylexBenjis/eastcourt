'use client'
import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './embladots'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './emblacarousel-buttons'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

type SlideType = {
  imageUrl: string;
  type: string;
};

type PropType = {
  slides: SlideType[];
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props

  console.log(slides)
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  console.log(slides)
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    if (emblaApi){console.log(emblaApi)}}, [emblaApi])
  return (
    <div className="">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex  items-center gap-x-3  h-[400px] max-w-[350px] md:max-w-[760px] lg:max-w-[1200px]">
          {slides.map((image: {imageUrl:string, type:string}, index: number)  => (
            <div className={`flex relative flex-shrink-0 bg-gray-50 h-[100%] w-[350px] md:w-[700px] rounded-md`} key={index}>
                 {image.type==='image'?
                  <img src={image.imageUrl} alt={image.imageUrl} style={{objectFit: 'contain'}} className='h-full w-full'/>
                  :<video src={image.imageUrl} controls className="w-full h-full object-contain"/>
                 }            
            </div> 
          ))}
        </div>
      </div>

      <div className="embla__controls"> 
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={
                index === selectedIndex ? ' embla__dot--selected' : 'embla__dot'
              }
              imageUrl = {slides[index].imageUrl}
              mediaType= {slides[index].type}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel