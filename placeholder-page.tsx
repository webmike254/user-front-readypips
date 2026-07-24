function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#111827]">{title}</h1>
        <p className="text-[#6B7280] mt-2">{description}</p>
      </div>
      <div className="p-12 rounded-3xl bg-white border border-[#ECECEC] shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-[#5B3DF5]" />
        </div>
        <h3 className="text-xl font-semibold text-[#111827] mb-2">Coming Soon</h3>
        <p className="text-[#6B7280] max-w-md mx-auto">This section is under development. Check back soon for updates.</p>
      </div>
    </motion.div>
  );
}