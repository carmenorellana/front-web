import { ContactPage } from "@/components/contact"
import { Slider } from "@/components/home"
import { Subscribe } from "@/components/ui"
import { Design } from "@/interfaces"
import { Block1, Block2, Block3, Block4, Block5, Block7, Call, Calls, Checkout, Lead1, Lead2, Plans, Services, Video } from '@/components/design'

async function fetchDesign () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, { next: { revalidate: 3600 } })
  return res.json()
}

async function fetchForms () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`, { next: { revalidate: 3600 } })
  return res.json()
}

async function fetchCalls () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls`, { next: { revalidate: 3600 } })
  return res.json()
}

async function fetchServices () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`, { next: { revalidate: 3600 } })
  return res.json()
}

async function fetchStoreData () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store-data`, { next: { revalidate: 3600 } })
  return res.json()
}

async function fetchPayment () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function generateMetadata() {
  const design: Design = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/design`, { next: { revalidate: 3600 } }).then((res) => res.json())
  const home = design.pages?.find(page => page.page === 'Inicio')
  return {
    title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
    description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
    openGraph: {
      title: home?.metaTitle && home?.metaTitle !== '' ? home?.metaTitle : '',
      description: home?.metaDescription && home?.metaDescription !== '' ? home?.metaDescription : '',
      url: `${process.env.NEXT_PUBLIC_WEB_URL}/`,
      images: [home?.image && home.image !== '' ? home.image : '']
    }
  }
}

export default async function Home() {

  const designData = fetchDesign()

  const formsData = fetchForms()

  const callsData = fetchCalls()

  const servicesData = fetchServices()

  const storeDataData = fetchStoreData()

  const paymentData = fetchPayment()

  const [design, forms, calls, services, storeData, payment] = await Promise.all([designData, formsData, callsData, servicesData, storeDataData, paymentData])

  return (
    <div className="flex flex-col">
      {
        design.pages?.map((page: any) => {
          if (page.page === 'Inicio') {
            return (
              <>
                {
                  page.design.map((content: any, index: any) => {
                    if (content.content === 'Carrusel') {
                      return <Slider key={content.content} info={content.info} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 1') {
                      return <Block1 key={content.content} content={content} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 2') {
                      return <Block2 key={content.content} content={content} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 3') {
                      return <Block3 key={content.content} content={content} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 4') {
                      return <Block4 key={content.content} content={content} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Bloque 5') {
                      return <Block5 key={content.content} content={content} index={index} calls={calls} forms={forms} design={design} payment={payment} />
                    } else if (content.content === 'Contacto') {
                      return <ContactPage key={content.content} info={ content.info } index={index} />
                    } else if (content.content === 'Suscripción') {
                      return <Subscribe key={content.content} info={ content.info } />
                    } else if (content.content === 'Lead 1') {
                      return <Lead1 key={content.content} content={content} forms={forms} index={index} services={services} />
                    } else if (content.content === 'Video') {
                      return <Video key={content.content} content={content} index={index} />
                    } else if (content.content === 'Agendar llamada') {
                      return <Call key={content.content} calls={calls} content={content} services={services} payment={payment} storeData={storeData} index={index} />
                    } else if (content.content === 'Bloque 7') {
                      return <Block7 key={content.content} content={content} />
                    } else if (content.content === 'Llamadas') {
                      return <Calls key={content.content} content={content} calls={calls} />
                    } else if (content.content === 'Checkout') {
                      return <Checkout key={content.content} content={content} services={services} payment={payment} storeData={storeData} />
                    } else if (content.content === 'Lead 2') {
                      return <Lead2 key={content.content} content={content} forms={forms} index={index} services={services} storeData={storeData} />
                    } else if (content.content === 'Servicios') {
                      return <Services key={content.content} content={content} services={services} index={index} />
                    } else if (content.content === 'Planes') {
                      return <Plans key={content.content} content={content} services={services} index={index} payment={payment} />
                    }
                  })
                }
              </>
            )
          }
        })
      }
    </div>
  )
}
