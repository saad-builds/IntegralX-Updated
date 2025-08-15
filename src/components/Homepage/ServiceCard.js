function ServiceCard({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg max-w-xs">
      {Icon && <Icon className="w-12 h-12 text-yellow-400 mb-4" />}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
export default ServiceCard;
