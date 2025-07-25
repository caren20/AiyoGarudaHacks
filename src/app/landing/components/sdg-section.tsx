export function SDGSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Sustainable Development Goals
          </h2>
        </div>

        <div className="flex justify-center items-center space-x-8 max-w-4xl mx-auto">
          {/* SDG 4 - Quality Education */}
          <div className="bg-red-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 max-w-xs">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">4</div>
              <div className="text-lg font-semibold mb-4">
                QUALITY
                <br />
                EDUCATION
              </div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  <path d="M21 5v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* SDG 5 - Gender Equality */}
          <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 max-w-xs">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">5</div>
              <div className="text-lg font-semibold mb-4">
                GENDER
                <br />
                EQUALITY
              </div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9C15 10.1 14.1 11 13 11S11 10.1 11 9V7.5L5 7V9C5 10.1 5.9 11 7 11S9 10.1 9 9V7.5L11 7.5V9C11 11.2 12.8 13 15 13S19 11.2 19 9V7.5L21 7V9Z" />
                  <circle cx="9" cy="16" r="2" />
                  <path d="M15.5 14L13.5 16L15.5 18L17.5 16L15.5 14Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* SDG 10 - Reduced Inequalities */}
          <div className="bg-pink-600 text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 max-w-xs">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">10</div>
              <div className="text-lg font-semibold mb-4">
                REDUCED
                <br />
                INEQUALITIES
              </div>
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 14H5V10H7V14ZM19 14H17V6H19V14ZM13 14H11V8H13V14ZM16 10V14H14V10H16ZM10 6V14H8V6H10Z" />
                  <path d="M3 16H21V18H3V16Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Stemify is committed to advancing the United Nations Sustainable
            Development Goals by providing quality STEM education, promoting
            gender equality in technology fields, and reducing inequalities
            through accessible learning opportunities for all.
          </p>
        </div>
      </div>
    </section>
  );
}
