import LayoutCommon from "src/components/Common/Layout"
import ContactInfo from "./components/ContactInfo"
import FormContact from "./components/FormContact"
// import Maps from "./components/Maps"
import { ContactStyled } from "./styled"
import { ConfigProvider } from "antd"
const ContactSupport = () => {
  return (
    <ContactStyled>
      <ConfigProvider
        theme={{
          token: {
            /* here is your global tokens */
            colorPrimary: "#e67e22",
          },
        }}
      >
        <LayoutCommon>
          <FormContact />
          <ContactInfo />
          {/* <Maps /> */}
        </LayoutCommon>
      </ConfigProvider>
    </ContactStyled>
  )
}
export default ContactSupport
