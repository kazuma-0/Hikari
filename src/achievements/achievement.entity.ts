import Blog from 'src/blog/blog.entity';
import { Entity } from 'typeorm';

@Entity()
class Achievement extends Blog {}

export default Achievement;
