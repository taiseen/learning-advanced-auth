import FloatingShape from "./FloatingShape";

const BgShape = () => {
    return (
        <>
            <FloatingShape size='w-48 h-48' delay={5} top='70%' left='80%' color='bg-emerald-500' />
            <FloatingShape size='w-64 h-64' delay={0} top='-5%' left='10%' color='bg-green-500' />
            <FloatingShape size='w-32 h-32' delay={2} top='40%' left='-10%' color='bg-lime-500' />
        </>
    )
}

export default BgShape