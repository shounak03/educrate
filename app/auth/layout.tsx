const AuthLayout = ({
    children
}:{
    children: React.ReactNode
})=>{
    return(
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 ">
            {children}
        </div>
    )
}

export default AuthLayout