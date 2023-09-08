export interface LeftRightProps {
    children?: React.ReactNode
    right?: React.ReactNode
}

export function LeftRight({ children, right }: LeftRightProps) {
    return (
        <div className="flex max-w-[900px] flex-col md:flex-row gap-8">
            <div className="w-[300px]">
                {children}
            </div>
            <div className="flex-1">
                {right}
            </div>
        </div>
    )
}
