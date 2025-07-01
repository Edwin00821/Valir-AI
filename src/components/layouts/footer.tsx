export const Footer = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer className="border-t mt-16" {...props}>
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>
          &copy; 2024 InvestIA. Predicciones basadas en modelos mock -
          Próximamente con IA real.
        </p>
      </div>
    </footer>
  );
};
