const UserEmail = localStorage.getItem('email')
if (UserEmail == '') {
    console.log('no email from the localStorage ')
}
export default UserEmail