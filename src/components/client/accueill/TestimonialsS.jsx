import { Star } from 'lucide-react'
import React from 'react'

const TestimonialsS = () => {
    const testimonials = [
        {
          id: 1,
          name: "Wilson",
          location: "New York, US",
          rating: 2,
          comment: "I've been using your services for years. Your service is great, I will continue to use your service.",
        },
        {
          id: 2,
          name: "Charlie Johnson",
          location: "From New York, US",
          rating: 5,
          comment:
            "I feel very secure when using caretail's services. Your customer care team is very enthusiastic and the driver is always on time.",
          image: "/placeholder.svg?height=48&width=48",
        },
        {
          id: 3,
          name: "Emma Peterson",
          location: "Chicago, US",
          rating: 4,
          comment: "The app is intuitive and the service is reliable. Would recommend!",
          image: "/placeholder.svg?height=48&width=48",
        },
      ]
  return (
    <div>
        <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
              TESTIMONIALS
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">What people say about us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-8 relative overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-800">
                      {testimonial.rating}.0 <span className="text-lg font-normal"></span>
                    </div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow">"{testimonial.comment}"</p>

                  <div className="flex items-center mt-4">
                    {testimonial.image && (
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image || "/images/placeholder.svg"}
                          alt={`${testimonial.name}'s profile`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default TestimonialsS
