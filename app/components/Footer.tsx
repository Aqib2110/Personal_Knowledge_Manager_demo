import React from 'react'

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-900 to-[#0B1E36] backdrop-blur-md border-t border-white/10">
      <div className=" max-w-7xl mx-auto px-6 pt-12 ">

        <div className="grid md:grid-cols-4 gap-10 text-sm text-gray-400">

          <div>
            <h3 className="text-white text-lg font-semibold mb-3">
              KnowledgeHub
            </h3>
            <p className="leading-relaxed">
              Your personal knowledge engine.
              <br />
              Ask your documents anything.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Product</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Use Cases</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3">Legal</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Security</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 py-6 border-t border-white/10 flex flex-1 flex-col md:flex-row items-center justify-center text-xs text-gray-500">
          <span>© {new Date().getFullYear()} KnowledgeHub. All rights reserved.</span>
          
        </div>

      </div>
    </div>
  )
}
export default Footer
