"use client"
import React, { useState } from 'react'
import { Button, H1, H2, P } from '../ui'
import Link from 'next/link'
import Image from 'next/image'
import { Design, ICall, IDesign, IForm, IPayment } from '@/interfaces'
import { PopupPage } from './PopupPage'

export const Block2 = ({ content, index, calls, forms, design, payment }: { content: IDesign, index: any, forms: IForm[], calls: ICall[], design: Design, payment: IPayment }) => {

  const [popup, setPopup] = useState({ view: 'hidden', opacity: 'opacity-0', mouse: false })
  const [cont, setCont] = useState('')

  return (
    <>
      <PopupPage popup={popup} setPopup={setPopup} content={cont} design={design} calls={calls} forms={forms} payment={payment} />
      <div key={content.content} className="w-full flex py-8 px-4 md:py-12" style={{ background: `${content.info.typeBackground === 'Degradado' ? content.info.background : content.info.typeBackground === 'Color' ? content.info.background : ''}` }}>
        <div className={`w-full flex max-w-[1280px] ${content.info?.image && content.info.image !== '' ? 'gap-8' : ''} m-auto flex-col text-center md:flex-row md:text-left`}>
          <div className="w-full hidden md:w-1/2 md:flex">
            {
              content.info?.image && content.info.image !== ''
                ? <Image className='h-fit m-auto rounded-2xl' width={480} height={300} alt='Imagen slider prueba' src={content.info.image} />
                : ''
            }
          </div>
          <div className="w-full m-auto flex flex-col gap-3 md:w-1/2">
            {
              index === 0
                ? <H1 text={content.info.title} color={content.info.textColor} /> 
                : <H2 text={content.info.title} color={content.info.textColor} />
            }
            <P text={content.info.description} color={content.info.textColor} />
            {
              content.info.buttonLink === 'Abrir popup' || calls.find(call => call._id === content.info.buttonLink) || forms.find(form => form._id === content.info.buttonLink)
                ? <Button action={(e: any) => {
                  e.preventDefault()
                  setCont(content.info.buttonLink!)
                  setPopup({ ...popup, view: 'flex', opacity: 'opacity-0' })
                  setTimeout(() => {
                    setPopup({ ...popup, view: 'flex', opacity: 'opacity-1' })
                  }, 10);
                }}>{content.info.button}</Button>
                : content.info.buttonLink === '' || content.info.button === ''
                  ? ''
                  : <Link href={`${content.info.buttonLink}`}><Button>{content.info.button}</Button></Link>
            }
          </div>
          <div className="w-full flex md:w-1/2 md:hidden">
            {
              content.info?.image && content.info.image !== ''
                ? <Image className='h-fit m-auto rounded-2xl' width={480} height={300} alt='Imagen slider prueba' src={content.info.image} />
                : ''
            }
          </div>
        </div>
      </div>
    </>
  )
}
