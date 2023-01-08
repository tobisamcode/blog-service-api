import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    public async get(): Promise<any> {
        try {
            const posts = await this.post.find({});

            return posts;
        } catch (error) {
            throw new Error('Unable to get posts');
        }
    }

    public async getById(id: string): Promise<any> {
        try {
            const post = await this.post.findById(id);

            return post;
        } catch (error) {
            throw new Error('Unable to get post');
        }
    }

    // create a new post
    public async create(
        title: string,
        body: string
    ): Promise<Post | undefined> {
        try {
            const post = await this.post.create({ title, body });

            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    public async update(
        id: string,
        body: {}
    ): Promise<Post | undefined | null> {
        try {
            await this.post.findByIdAndUpdate({ _id: id }, { ...body });
            const updatedPost = await this.post.findById(id);
            return updatedPost;
        } catch (error) {
            throw new Error('Unable to update post');
        }
    }

    public async delete(id: string): Promise<any> {
        try {
            const post = await this.post.findByIdAndDelete({ _id: id });

            return post;
        } catch (error) {
            throw new Error('Unable to delete post');
        }
    }
}

export default PostService;
