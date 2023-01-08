import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class UpdateService {
    private post = PostModel;

    // update an existing post
    public async update(
        id: string,
        body: {}
    ): Promise<Post | undefined | null> {
        try {
            const post = await this.post.findByIdAndUpdate(
                { _id: id },
                { ...body }
            );

            return post;
        } catch (error) {}
    }
}

export default UpdateService;
