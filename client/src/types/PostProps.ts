type PostProps = {
	_id: string
	message: string
	likes: []
	likesCount: number 
	createdAt: any 
	owner: [{
		_id: any
		name: string 
		picture: string
	}]
	comments_id: string
	commentsCount: number
}

export default PostProps