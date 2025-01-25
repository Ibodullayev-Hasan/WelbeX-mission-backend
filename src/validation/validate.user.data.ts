import { IUser } from "src/interfaces";

export function validateUserData(userData: Partial<IUser>): string | null {
	if (!userData || Object.keys(userData).length < 1) {
		return 'username and password fields cannot be empty';
	}
	const { username, password } = userData;
	if (!username || !password) {
		return 'username and password are required';
	}
	
	if (password.length < 4 || password.length > 8) {
		return 'password must be between 4 and 8 characters';
	}
	const usernameRegex = /^[a-zA-Z0-9_]+$/;
	if (!usernameRegex.test(username)) {
		return 'username can only contain letters, numbers, and underscores';
	}
	const hasLetter = /[a-zA-Z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	if (!hasLetter || !hasNumber) {
		return 'password must contain at least one letter and one number';
	}
	return null;
}
