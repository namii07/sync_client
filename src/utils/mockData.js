export const mockPosts = [
  {
    _id: '1',
    content: 'Welcome to Sync! This is a sample post to get you started.',
    author: {
      _id: 'user1',
      username: 'sync_team',
      avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg'
    },
    createdAt: new Date().toISOString(),
    likes: [],
    likesCount: 0,
    comments: [],
    isLiked: false,
    isSaved: false
  }
];

export const mockUsers = [
  {
    _id: 'user1',
    username: 'alice',
    avatar: 'https://i.pinimg.com/736x/b3/35/ec/b335ecd186e7a7e8913c41418ce9c9c0.jpg',
    bio: 'Frontend Developer | React Enthusiast',
    followersCount: 150,
    isFollowing: false
  },
  {
    _id: 'user2',
    username: 'john',
    avatar: 'https://i.pinimg.com/736x/78/49/25/784925b2707ac85810965a0fcb0da88a.jpg',
    bio: 'Full Stack Developer | Open Source Contributor',
    followersCount: 200,
    isFollowing: false
  }
];