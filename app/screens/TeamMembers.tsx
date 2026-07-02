import { Github, Linkedin } from "iconoir-react"
import { CircleUser, Dot } from "lucide-react"
import Link from "next/link"

function TeamMembers() {
  const users = [
    {
      id: 1,
      name: "Mirza Zain",
      subTitle: "Full Stack Developer",
      GitLink: "https://github.com/mirza-zain",
      LinkedinLink: "https://www.linkedin.com/in/mirza-zain269/",
    },
    {
      id: 2,
      name: "Hira Ishaq",
      subTitle: "Full Stack Developer",
      GitLink: "/",
      LinkedinLink: "/",
    },
    {
      id: 3,
      name: "Junaid Rashid",
      subTitle: "AI Developer",
      GitLink: "/",
      LinkedinLink: "/",
    },
  ]

  return (
    <section className="mx-auto flex flex-col justify-center items-center p-5 mb-20">
        <div className="flex items-center justify-center my-20">
            <h2 className="text-3xl font-bold ">Team Members</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {
            users.map(user => {
              return (
                <div key={user.id} className="flex justify-center items-center gap-5 group relative p-12 border border-white rounded-4xl bg-navy/20 transition-all duration-300 hover:border-pregold transform hover:-translate-y-1">
                  <div className="w-20 h-20 rounded-xl bg-pregold/10 flex items-center justify-center text-pregold text-xl mb-6 group-hover:bg-pregold group-hover:text-waterloo transition-all duration-300"> 
                    <CircleUser size={40} />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{user.name}</h3>
                    <p className="text-xs md:text-sm font-medium mb-5">{user.subTitle}</p>
                    <div className="flex items-center justify-center gap-10">
                      <span className="group-hover:text-pregold" ><Link href={user.LinkedinLink} target="_blank" ><Linkedin fontSize={20} /></Link></span>
                      <span className="group-hover:text-pregold" ><Link href={user.GitLink} target="_blank" ><Github fontSize={20} /></Link></span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </section>
  )
}

export default TeamMembers
