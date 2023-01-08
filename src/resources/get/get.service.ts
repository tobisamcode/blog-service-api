import PostModel from '@/resources/post/post.model';

class GetService {
    private post = PostModel;

    public async get(): Promise<any> {
        try {
            const posts = await this.post.find({});

            return posts;
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }
}

export default GetService;
