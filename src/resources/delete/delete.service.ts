import PostModel from '@/resources/post/post.model';

class DeleteService {
    private post = PostModel;

    public async delete(id: string): Promise<any> {
        try {
            const post = await this.post.findByIdAndDelete({ _id: id });

            return post;
        } catch (error) {
            throw new Error('Unable to delete post');
        }
    }
}

export default DeleteService;
