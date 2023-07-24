"use client"
import React from 'react'
import { useRouter } from 'next/navigation'


function BlogCards({ Blogs }) {
    return(
      <div className=''>
        {Blogs && Blogs.map(blog =>(
          <div key={blog._id}>
            <h2>{blog.id}</h2>

          </div>
        ))}
      </div>
    )
}
  
  export default BlogCards;
