import {Link} from "react-router-dom"
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import './HomePage.css';

export default function HomePage() {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col min-h-[100dvh]" id="homepage">
      <header className="bg-background px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link to='/' className="flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">FinAlign</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            About Us
          </Link>
          <Link to='/signup' className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Sign Up
          </Link>
          <Link to='/login' className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Log In
          </Link>
        </nav>
        <button variant="outline" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Revolutionize Your Finances
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover a seamless financial experience with our innovative platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    id="get-started"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    id="learn-more"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Finances</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of tools to help you manage your finances with ease.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Budgeting</h3>
                  <p className="text-muted-foreground">
                    Stay on top of your spending with our intuitive budgeting tools.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Investments</h3>
                  <p className="text-muted-foreground">
                    Grow your wealth with our investment tracking and analysis features.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Insights</h3>
                  <p className="text-muted-foreground">
                    Gain valuable insights into your financial health with our reporting tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted by Thousands</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers have to say about their experience with our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <div className="p-6 bg-muted rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center" id="UserIcon">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">John Doe</h4>
                    <p className="text-muted-foreground text-sm">CEO, Acme Inc.</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "FinAlign has been a game-changer for our business. The platform's features and insights have helped
                  us make more informed financial decisions."
                </p>
              </div>
              <div className="p-6 bg-muted rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center" id="UserIcon">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Jane Smith</h4>
                    <p className="text-muted-foreground text-sm">CFO, Globex Corporation</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "FinAlign has been a game-changer for our business. The platform's features and insights have helped
                  us make more informed financial decisions."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question or want to learn more? Fill out the form below and we'll get back to you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2">
                <input type="text" placeholder="Name" className="max-w-lg" />
                <input type="email" placeholder="Email" className="max-w-lg" />
                <TextareaAutosize
                  minRows={3}
                  maxRows={6}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Type something..."
                  className="border rounded px-2 py-1"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 FinAlign. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E3EDDE"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}