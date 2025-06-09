package schemas

type User struct {
	ID       uint   `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Role     `json:"role"`
}

type UserResponse struct {
	Token string `json:"token"`
	User  `json:"user"`
}
