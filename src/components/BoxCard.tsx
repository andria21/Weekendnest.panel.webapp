import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";

interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select";
  options?: { value: string; label: string }[];
}

interface EntityCardProps<T extends Record<string, unknown>> {
  // Core data
  data: T & { id: string | number };

  // Card content configuration
  description: string;
  title: string;
  badgeText: string;
  footerPrimary: string | undefined;
  footerSecondary: string;
  footerTertiary?: string;

  // Optional customization
  badgeIcon?: React.ReactNode;
  footerIcon?: React.ReactNode;
  className?: string;

  // Edit modal configuration
  entityName: string;
  fields: Field[];
  submitAction: (data: T) => Promise<unknown>;

  // Delete configuration
  deleteAction: (id: string | number) => Promise<boolean>;

  // Optional components to inject
  EditModalForm?: React.ComponentType<{
    entityName: string;
    data: T;
    fields: Field[];
    submitAction: (data: T) => Promise<unknown>;
  }>;
  DeleteButton?: React.ComponentType<{
    id: string | number;
    deleteAction: (id: string | number) => Promise<boolean>;
    entityName: string;
  }>;
}

export function EntityCard<T extends Record<string, unknown>>({
  data,
  description,
  title,
  badgeText,
  footerPrimary,
  footerSecondary,
  footerTertiary,
  badgeIcon = <IconTrendingUp />,
  footerIcon = <IconTrendingUp className="size-4" />,
  className = "",
  entityName,
  fields,
  submitAction,
  deleteAction,
  EditModalForm,
  DeleteButton,
}: EntityCardProps<T>) {
  return (
    <div
      className={`@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                 dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                 data-[slot=card]:shadow-xs transform transition-transform duration-400 hover:scale-104 ${className}`}
    >
      <Card className="@container/card">
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {title}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {badgeIcon}
            {badgeText}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerPrimary}
        </div>
        <div className="text-muted-foreground">{footerSecondary}</div>
        {footerTertiary && (
          <div className="text-muted-foreground">{footerTertiary}</div>
        )}
        <div className="flex justify-between w-full">
          {EditModalForm && (
            <EditModalForm
              entityName={entityName}
              data={data}
              fields={fields}
              submitAction={submitAction}
            />
          )}
          {DeleteButton && (
            <DeleteButton
              id={data.id}
              deleteAction={deleteAction}
              entityName={entityName}
            />
          )}
        </div>
      </CardFooter>
      </Card>
    </div>
  );
}
