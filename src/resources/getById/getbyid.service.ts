import PostModel from '@/resources/post/post.model';

class GetByIdService {
    private post = PostModel;

    public async get(id: string): Promise<any> {
        try {
            const post = await this.post.findById(id);

            return post;
        } catch (error) {
            throw new Error('Unable to get post');
        }
    }
}

export default GetByIdService;
