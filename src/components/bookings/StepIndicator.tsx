type StepIndicatorProps = {
  steps: readonly string[];
  currentStep: number;
};

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="w-full border border-border rounded-lg bg-background p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isComplete = currentStep > stepNumber;

          return (
            <div
              key={label}
              className={`rounded-md border px-3 py-2 text-xs md:text-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : isComplete
                    ? "border-green-500/30 bg-green-500/10 text-green-700"
                    : "border-border text-muted-foreground"
              }`}
            >
              <p className="font-semibold tracking-wide uppercase text-[10px] md:text-xs mb-1">
                Step {stepNumber}
              </p>
              <p className="font-medium leading-tight">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
