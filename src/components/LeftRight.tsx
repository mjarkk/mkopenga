export interface LeftRightProps {
    children?: React.ReactNode
    right?: React.ReactNode
    rightWidth?: number | string
}

export function LeftRight({ children, right, rightWidth }: LeftRightProps) {
    return (
        <div className="flex max-w-[1400px] flex-col md:flex-row gap-8">
            <div className="max-w-full md:max-w-auto flex-1">
                {children}
            </div>
            <div style={{ width: rightWidth ?? '50%' }}>
                {right}
            </div>
        </div>
    )
}
