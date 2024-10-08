import Image from "next/image"

export const Icons = {
  logo: (props: any) => {
    return <Image src="/postgen/logo.png" alt="logo" {...props} width={32} height={32} />
  },
}
