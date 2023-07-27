import {Component} from 'react'
import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

// const blogsData = [
//   {
//     id: 1,
//     title: 'Blog 1',
//     imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-1-img.png',
//     avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//     author: 'Author Name',
//     topic: 'React.js',
//   },
//   {
//     id: 2,
//     title: 'Blog 2',
//     imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-2-img.png',
//     avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//     author: 'Author Name',
//     topic: 'React.js',
//   },
// ]

class BlogsList extends Component {
  state = {blogsData: [], isLoading: false}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    this.setState({isLoading: true})
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()

    const updatedData = data.map(eachBlog => ({
      id: eachBlog.id,
      avatarUrl: eachBlog.avatar_url,
      imageUrl: eachBlog.image_url,
      author: eachBlog.author,
      title: eachBlog.title,
      topic: eachBlog.topic,
    }))
    if (response.ok === true) {
      this.setState({blogsData: updatedData, isLoading: false})
    }
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blog-list-container">
        {isLoading ? (
          <>
            {/* <p>Loading......</p> */}
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </>
        ) : (
          <ul>
            {blogsData.map(item => (
              <BlogItem blogData={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogsList
