import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          <h4 className="text-xl font-bold gradient-text mb-4">
            LUXURYCARDCLUB
          </h4>
          <p className="text-sm">
            © 2024 LuxuryCardClub. Играйте ответственно. Только 18+
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="ghost" size="sm" className="interactive-button">
              <Icon name="Shield" className="mr-2" size={14} />
              Лицензия
            </Button>
            <Button variant="ghost" size="sm" className="interactive-button">
              <Icon name="HelpCircle" className="mr-2" size={14} />
              Поддержка 24/7
            </Button>
            <Button variant="ghost" size="sm" className="interactive-button">
              <Icon name="FileText" className="mr-2" size={14} />
              Правила
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}