import { IUser } from "../interfaces";

export function validateUserData(userData: Partial<IUser>): string | null {
	if (!userData || Object.keys(userData).length < 1) {
		return 'username, password, and login fields cannot be empty';
	}

	const { username, password, login } = userData;

	if (!username || !password || !login) {
		return 'username, password, and login are required';
	}

	const loginRegex = /^[a-zA-Z0-9_]+$/;
	if (!loginRegex.test(login)) {
		return 'login can only contain letters, numbers, and underscores';
	}

	if (password.length < 4 || password.length > 8) {
		return 'password must be between 4 and 8 characters';
	}

	if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
		return 'password must contain at least one letter and one number';
	}

	return null;
};
