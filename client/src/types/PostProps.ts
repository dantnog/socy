type PostProps = {
	_id: any
	message: string
	likes: []
	likesCount: number 
	createdAt: any 
	owner: [{
		_id: any
		name: string 
		picture: string
	}]
}

export default PostProps