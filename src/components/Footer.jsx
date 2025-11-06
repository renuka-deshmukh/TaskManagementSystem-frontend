import React from 'react'

const Footer = () => {
    return (
        <div>

            <footer className="bg-light text-center text-muted py-3 mt-4 border-top">
                <div className="container">
                    <p className="mb-1 fw-semibold">Task Manager</p>
                    <small>
                        © {new Date().getFullYear()} Task Manager. Built with ❤️ using React & Bootstrap.
                    </small>
                </div>
            </footer>

        </div>
    )
}

export default Footer