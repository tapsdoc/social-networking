/**
 * Interface for the 'Posts' data
 */
export interface PostsEntity {
	content: string;
	created_at: string;
	id: number;
	owner: {
		created_at: string;
		email: string;
		id: number;
		updated_at: string;
		username: string;
	};
	owner_id: number;
	published?: boolean;
	title: string;
	votes?: number;
}

export interface PostCreateEntity {
	content: string;
	published?: boolean;
	title: string;
}

export interface PostUpdateEntity {
	content: (string | null);
	published?: (boolean | null);
	title: (string | null);
}
