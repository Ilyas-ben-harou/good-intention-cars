import React from 'react'

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-red-600">Page Not Found</h1>
                <p className="text-gray-700">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <div className="pt-4">
                    <button
                        onClick={() => window.location.href = '/admin/login'}
                        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage
