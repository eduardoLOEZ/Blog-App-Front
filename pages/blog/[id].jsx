import { useRouter } from "next/router"
import "../../app/styles/card.css"

function Page({ datos }) {
  const router = useRouter() 
  //console.log(router.query)
  return (
    <div className="blog-container">
      <h1 className="blog-title">{datos.title}</h1>
      <h2 className="blog-summary">{datos.summary}</h2>
      <br />
      <p className="blog-content">{datos.content}</p>
      <img className="blog-image" src={datos.imgurl} alt="" />
      <button className="back-button" onClick={() => router.push("http://localhost:3000/admin")}>Regresar a los blogs</button>
    </div>
  )
}

export async function getServerSideProps({ query: { id } }) {

  const url = `http://localhost:4000/blog/${id}`
  console.log(url)

  const respuesta = await fetch(url)
  const datos = await respuesta.json()

  //console.log(datos)

  return {
    props: {
      datos

    }
  }
}

export default Page
