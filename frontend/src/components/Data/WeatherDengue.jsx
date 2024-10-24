import { Link } from "react-router-dom";

export default function WeatherDengue({ content }) {
    return (
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md border border-gray-200 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                CHATGPT 4 Weather and Dengue Information Summary Today
            </h2>
            <p className="text-gray-700 lg:text-lg leading-relaxed">
                {content}
            </p>

            {/* Improved Note Section */}
            <div className="bg-blue-50 text-blue-900 p-4 mt-8 rounded-lg border border-blue-200 text-center">
                <p className="text-base">
                    For more detailed news and article references, visit our
                    <Link to="/news" className="text-blue-600 underline ml-1 font-semibold hover:text-blue-800 transition-colors">
                        News Section
                    </Link>.
                </p>
            </div>
        </div>
    );
}
