export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-8 p-6">
      <div className="space-y-1 px-12">
        <h1 className="text-2xl font-bold text-black">Notifications</h1>
        <p className="text-base text-[#4B4B4B]">
          Stay updated with important alerts and messages about your loans.
        </p>
      </div>
      
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-base text-[#4B4B4B]">
            No notifications yet.
          </p>
        </div>
      </div>
    </div>
  )
}