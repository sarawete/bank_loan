export default function DevicesPage() {
  return (
    <div className="flex-1 space-y-8 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-black">Connected Devices</h1>
        <p className="text-base text-[#4B4B4B]">
          Manage and monitor your connected devices and their status.
        </p>
      </div>
      
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-base text-[#4B4B4B]">
            No devices connected yet.
          </p>
        </div>
      </div>
    </div>
  )
}