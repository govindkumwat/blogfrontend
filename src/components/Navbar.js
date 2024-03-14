import { Modal } from '@mantine/core'
import React, { useState, useEffect, forwardRef } from 'react'
import UploadUI from './UploadUI'
import { useDisclosure } from '@mantine/hooks'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import getPostList from '../Radux/actions/getPostList'
import { Button, Menu, UnstyledButton, Group, Avatar, Text } from '@mantine/core'
import { IconChevronRight, IconLogout, IconUser } from '@tabler/icons-react';
import { bindActionCreators } from 'redux'
import setPostAction from '../Radux/actions/setPostAction'
import { userDetails } from '../Radux/actions/auth'
import { performLogOutAction } from '../Radux/actions/auth'
import { Link } from 'react-router-dom'
import '../App.css'
import axios from 'axios'


const Navbar = (props) => {
    const [searchInput, setSearchInput] = useState('')
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [thumbs, setThumbs] = useState([])
    const dispatch = useDispatch();

    const {postList, setPostAction, savePostResponse, userDetails, userInfo, performLogOutAction} = props

    useEffect(() => {
        userDetails()
      }, []);

      const navigate = useNavigate()

      const UserButton = forwardRef(
        ({ image, name, email, icon, ...others }, ref) => (
          <UnstyledButton
            ref={ref}
            style={{
              padding: 'var(--mantine-spacing-md)',
              color: 'var(--mantine-color-text)',
              borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
          >
            <Group>
              <Avatar src={image} radius="xl" />
      
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {name}
                </Text>
      
                <Text c="dimmed" size="xs">
                  {email}
                </Text>
              </div>
      
              {icon || <IconChevronRight size="1rem" />}
            </Group>
          </UnstyledButton>
        )
      );

      function convertToBase64(e) {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
          console.log(reader.result);
          setThumbs(reader.result)
        }
        reader.onerror = error => {
          console.log('error', error)
        } 
      }


      const handleSubmit = async (e) => {
        e.preventDefault()
       
        try {
          const formData = new FormData()
          formData.append('file', thumbs)
         await setPostAction(
            userInfo?.userId,
            userInfo?.name,
            title,
            description,
            tags,
            thumbs
            )
           await close();
           setTitle('')
           setTags([])
          await dispatch(getPostList(1, '', ''));
    
        } catch (error) {
          console.error('Error submitting post:', error);
        }
      };

  return (
    <div>
       <Modal opened={opened} onClose={close} fullScreen >
        <UploadUI
          setTitle={setTitle}
          setDescription={setDescription}
          setTags={setTags}
          tags={tags}
          title={title}
          description={description}
          setThumbs={setThumbs}
          thumbs={thumbs}
          handleSubmit={handleSubmit} 
          convertToBase64= {convertToBase64}
          />
          
      </Modal>

      <div className='uploadbutton'>
        <Link to='/' className='trendingheader'><svg width="200.00000000000006" height="50.83899356363065" viewBox="0 0 369.91304347826093 67.98035443796185" class="looka-1j8o68f"><defs id="SvgjsDefs1223"></defs><g id="SvgjsG1224" featurekey="symbolFeature-0" transform="matrix(1.0320975424329166,0,0,1.0320975424329166,-8.416029764955912,-12.468826852966417)" fill="#222831"><g xmlns="http://www.w3.org/2000/svg"><path d="M38.4296875,28.9643555c2.7109375,0,4.9169922-2.199707,4.9169922-4.9042969s-2.2060547-4.9042969-4.9169922-4.9042969   c-2.7265625,0-4.9443359,2.199707-4.9443359,4.9042969S35.703125,28.9643555,38.4296875,28.9643555z M38.4296875,20.7553711   c1.7978516,0,3.3173828,1.5136719,3.3173828,3.3046875c0,1.8222656-1.4882813,3.3046875-3.3173828,3.3046875   c-1.84375,0-3.3447266-1.4824219-3.3447266-3.3046875S36.5859375,20.7553711,38.4296875,20.7553711z"></path><path d="M51.5996094,28.9643555c2.7265625,0,4.9443359-2.199707,4.9443359-4.9042969s-2.2177734-4.9042969-4.9443359-4.9042969   s-4.9443359,2.199707-4.9443359,4.9042969S48.8730469,28.9643555,51.5996094,28.9643555z M51.5996094,20.7553711   c1.84375,0,3.3447266,1.4824219,3.3447266,3.3046875s-1.5009766,3.3046875-3.3447266,3.3046875   s-3.3447266-1.4824219-3.3447266-3.3046875S49.7558594,20.7553711,51.5996094,20.7553711z"></path><path d="M77.0488281,70.2950439V42.6108398c0-3.9022827-3.0474854-7.1028442-6.897522-7.3875122   c-0.8265381-1.9910278-2.6865234-3.4516602-4.9144897-3.7286987c-0.2944946-9.1774902-6.8381348-16.8043823-15.5600586-18.8533936   c-0.1116333-0.0591431-0.2330933-0.1011963-0.3681641-0.1011963c-0.0056763,0-0.010376,0.0031128-0.0159912,0.0032349   c-1.3848267-0.2967529-2.8183594-0.4622192-4.291626-0.4622192c-1.4691162,0-2.8988037,0.1641235-4.2799683,0.4592285   c-0.0004272,0-0.0008545-0.0002441-0.0012817-0.0002441c-0.1281128,0-0.2446289,0.0367432-0.3519897,0.090332   c-8.7432861,2.0340576-15.3076172,9.6716919-15.6026001,18.8641968c-2.2290649,0.2769775-4.0895996,1.7382813-4.9158936,3.7300415   c-3.8520508,0.2973022-6.8961182,3.4928589-6.8961182,7.3862305v27.6872559   c-2.7896118,0.9716187-4.7988281,3.6107178-4.7988281,6.7145996v0.1347656c0,0.4418945,0.3583984,0.7998047,0.7998047,0.7998047   h3.6533203c0.4414063,0,0.7998047-0.4116211,0.7998047-0.8535156c0-1.0478516,0.8525391-1.9008789,1.8994141-1.9008789   c1.0800781,0,1.9267578,0.8349609,1.9267578,1.9545898c0,0.4418945,0.3583984,0.7998047,0.7998047,0.7998047H21.6875   c0.4414063,0,0.7998047-0.3579102,0.7998047-0.7998047v-0.1347656c0-3.0968018-2.0081177-5.7307129-4.7988281-6.7077026V42.6108398   c0-1.3214722,0.9441528-2.427063,2.1951294-2.6818237c0.8391724,1.9390869,2.6658325,3.3571167,4.8488159,3.6403198v7.4663086   c0,8.5200195,5.4031982,16.0316162,13.4970703,18.8936768v0.2786865v2.9160156   c0,0.2270508,0.0029297,0.4541016,0.0351563,0.6816406c0.0004272,0.0029297,0.0022583,0.0053101,0.0027466,0.0082397   c0.3364868,2.3572388,2.4075928,4.1333618,4.8244019,4.1333618h3.8173828c2.4199219,0,4.4960938-1.7817383,4.828125-4.1445313   c0.0004883-0.0036011-0.0012207-0.007019-0.0007935-0.0106201c0.0006104-0.0040283,0.0031738-0.0073242,0.0037231-0.0113525   c0.03125-0.2192383,0.0585938-0.4379883,0.0585938-0.6567383v-2.9160156v-0.2788086   c8.0782471-2.8577271,13.4707031-10.3691406,13.4707031-18.8935547v-7.4663696   c2.1827393-0.2833252,4.0094604-1.7017212,4.8483887-3.6413574c1.2475586,0.2513428,2.2219238,1.37677,2.2219238,2.6829224   v27.6842041c-2.8049927,0.9692383-4.8261719,3.6107178-4.8261719,6.7176514v0.1347656   c0,0.4418945,0.3583984,0.7998047,0.7998047,0.7998047h3.6542969c0.4414063,0,0.7998047-0.4116211,0.7998047-0.8535156   c0-1.0478516,0.8642578-1.9008789,1.9267578-1.9008789s1.9267578,0.8530273,1.9267578,1.9545898   c0,0.4418945,0.3583984,0.7998047,0.7998047,0.7998047h3.6542969c0.4414063,0,0.7998047-0.3579102,0.7998047-0.7998047v-0.1347656   C81.875,73.9057617,79.8538208,71.2642822,77.0488281,70.2950439z M48.5087891,14.0184937v0.2124634   c0,1.8964844-1.5732422,3.4394531-3.5078125,3.4394531c-1.9199219,0-3.4814453-1.5429688-3.4814453-3.4394531v-0.2164917   c1.1293945-0.2116699,2.2907104-0.3338013,3.4814453-0.3338013C46.2008667,13.6806641,47.3712158,13.8036499,48.5087891,14.0184937   z M39.9360352,14.3892822c0.0866089,2.7041626,2.3178711,4.8807373,5.0649414,4.8807373   c2.7591553,0,5.000061-2.1732788,5.0905151-4.8742065c7.5738525,2.1275024,13.1846924,8.8635254,13.5374146,16.9381714H26.3730469   C26.7261963,23.2503662,32.3493042,16.5088501,39.9360352,14.3892822z M39.8291016,36.4169922h10.3701172v1.8837891H39.8291016   V36.4169922z M50.1992188,34.8173828H39.8291016v-1.8837891h10.3701172V34.8173828z M20.8476563,76.3476563h-2.0947266   c-0.3457031-1.5732422-1.7597656-2.7543945-3.4462891-2.7543945c-1.6611328,0-3.0556641,1.1640625-3.4111328,2.7543945H9.7939453   c0.3320313-2.730957,2.6777344-4.8540039,5.5126953-4.8540039C18.15625,71.4936523,20.5136719,73.6166992,20.8476563,76.3476563z    M16.0888672,42.6108398v27.3274536c-0.2572021-0.027771-0.5177002-0.0442505-0.7822266-0.0442505   c-0.2546997,0-0.5059814,0.0144043-0.7539063,0.0404053V42.6108398c0-2.8657227,2.1088867-5.2479858,4.8706665-5.7238159   c-0.0227661,0.2128296-0.0357056,0.4284668-0.0357056,0.6471558c0,0.2926636,0.0280762,0.5782471,0.0684814,0.8599854   C17.5315552,38.8392334,16.0888672,40.5559692,16.0888672,42.6108398z M20.9873047,37.5341797   c0-2.2075195,1.6191406-4.0483398,3.7451172-4.4228516v8.8461914   C22.6064453,41.5825195,20.9873047,39.7416992,20.9873047,37.5341797z M50.1992188,67.5244141v1.8461914v0.0375977H39.8291016   v-0.0375977v-1.8461914H50.1992188z M39.8291016,71.0078125h10.3701172v1.8837891H39.8291016V71.0078125z M40.1481934,65.9248047   c0.522644-1.0933838,1.6409302-1.8569336,2.9436035-1.8569336h3.8173828c1.3139648,0,2.4415283,0.7635498,2.9683838,1.8569336   H40.1481934z M46.9091797,76.3476563h-3.8173828c-1.2949219,0-2.4423828-0.753418-2.96875-1.8564453h9.7548828   C49.3515625,75.5942383,48.2041016,76.3476563,46.9091797,76.3476563z M51.7988281,68.2387695v-0.9472656   c0-0.2192383-0.0283203-0.4389648-0.0615234-0.6772461c-0.001709-0.0124512-0.0091553-0.0223389-0.0114136-0.0346069   c-0.3522949-2.3206177-2.3675537-4.1113892-4.8167114-4.1113892h-3.8173828c-2.3960571,0-4.3800049,1.730957-4.7780151,3.9961548   c-0.0170898,0.0483398-0.0842896,0.6000366-0.0842896,0.8270874v0.9477539   c-3.593689-1.3905029-6.5758057-3.7922363-8.65625-6.8063965c0.6549072-7.9115601,7.3843384-14.079834,15.4277344-14.079834   c8.0733032,0,14.8056641,6.1745605,15.4299316,14.0913696C58.3555298,64.4545898,55.381897,66.8517456,51.7988281,68.2387695z    M61.7216797,59.2556152C60.1229248,51.5266724,53.192627,45.753418,45.0009766,45.753418   c-8.1665039,0-15.0959473,5.7730103-16.7145996,13.5019531c-1.2565918-2.4962769-1.9543457-5.2930298-1.9543457-8.2197266   v-5.1499023h9.4609375v-1.5996094h-9.4609375v-1.4589844v-0.7172852h6.6181641v-1.5996094h-6.6181641v-2.1762695h4.28125V36.734375   h-4.28125v-3.8007813h11.8974609v2.6835938v2.9165039c0,0.2270508,0.0029297,0.4541016,0.0351563,0.6816406   c0.0576172,0.3930664,0.3945313,0.6850586,0.7919922,0.6850586h11.8886719c0.3994141,0,0.7402344-0.3134766,0.7949219-0.7084961   c0.0302734-0.2192383,0.0585938-0.4389648,0.0585938-0.6582031v-2.9165039v-2.6835938h11.8710938v1.5913086h-9.0625v1.5996094   h9.0625v2.1762695h-6.2197266v1.5996094h6.2197266v2.1762695h-3.8837891v1.5996094h3.8837891v7.359375   C63.6699219,53.9629517,62.9744263,56.7597046,61.7216797,59.2556152z M65.2695313,41.9575195v-8.8461914   c2.125,0.375,3.7441406,2.215332,3.7441406,4.4228516S67.3945313,41.5825195,65.2695313,41.9575195z M70.5460815,38.3858032   c0.0396118-0.2790527,0.0671997-0.5618896,0.0671997-0.8516235c0-0.2199707-0.0132446-0.4368286-0.0362549-0.6508179   c2.7610474,0.4660034,4.8721924,2.8533936,4.8721924,5.727478v27.3233032   c-0.24823-0.0258179-0.4998779-0.0401001-0.7548828-0.0401001s-0.5066528,0.0142822-0.7548828,0.0401001V42.6108398   C73.9394531,40.5460815,72.4844971,38.8206177,70.5460815,38.3858032z M78.140625,76.3476563   c-0.3457031-1.5732422-1.7597656-2.7543945-3.4462891-2.7543945c-1.6738281,0-3.0800781,1.1640625-3.4384766,2.7543945h-2.1025391   c0.3339844-2.730957,2.6914063-4.8540039,5.5410156-4.8540039s5.2070313,2.1230469,5.5410156,4.8540039H78.140625z"></path></g></g><g id="SvgjsG1225" featurekey="nameFeature-0" transform="matrix(1.433499271789017,0,0,1.433499271789017,94.56650072821098,-10.814407348397541)" fill="#222831"><path d="M19.12 26.64 c5.36 1.16 7.2 3.44 7.2 6.48 c0 4.56 -3.96 6.88 -12.04 6.88 l-13.28 0 l0 -2.04 c2.32 -0.16 3 -0.44 3 -1.44 l0 -18.2 c0 -0.88 -0.84 -1.04 -2.6 -1.16 l0 -2 c4.28 0.16 8.36 0 10.12 0 c9.48 0 12.2 2.8 12.2 6.4 c0 1.96 -1.32 4.12 -4.6 5.08 z M11.48 17.2 l0 9.12 c4.04 -0.8 5.48 -2 5.48 -4.76 s-1.04 -4.4 -3.88 -4.4 c-0.68 0 -1.12 0 -1.6 0.04 z M14.32 37.76 c2.6 0 4.56 -1.12 4.56 -4.76 c0 -3.24 -1.24 -4.92 -5.36 -4.92 l-2.04 0.4 l0 7.8 c0 1 0.12 1.48 1.8 1.48 l1.04 0 z M50.519999999999996 19.96 l0 2 l-1.44 0.12 c-1.56 0.08 -1.84 1.48 -2.08 2.04 l-9.72 23.68 c-0.28 0.68 -0.56 0.96 -1.92 0.96 c-1.64 0 -2.08 -0.28 -1.72 -0.96 c0.6 -0.92 3.8 -5.48 3.8 -6.48 c0 -1.24 -5.16 -11.52 -7.92 -17.2 c-0.32 -0.68 -0.72 -1.88 -1.6 -2.04 l-1.2 -0.12 l0 -2 c3.72 0.12 8.04 0.12 11.88 0 l0 2 l-1.08 0.12 c-1.08 0.16 -1.24 1.4 -0.88 2.04 l4.4 8.76 l3.64 -8.76 c0.32 -0.72 0 -1.96 -1.6 -2.04 l-1.56 -0.12 l0 -2 c2.8 0.12 5.28 0.12 9 0 z M64.28 38.96 c-1.12 0.84 -2.72 1.32 -4.6 1.32 c-4.2 0 -6.64 -2.32 -6.64 -6.96 l0 -11.16 l-1.4 0 c-0.52 0 -0.68 -0.24 -0.68 -0.76 l0 -0.68 c0 -0.52 0.16 -0.76 0.68 -0.76 c3.44 0 4.8 -2.44 5.12 -5.44 l3.44 0 l0 5.44 l3.32 0 c0.52 0 0.68 0.24 0.68 0.76 l0 0.68 c0 0.52 -0.16 0.76 -0.68 0.76 l-3.32 0 l0 11.92 c0 2.08 0.12 3.6 1.76 3.6 c0.64 0 1.64 -0.32 2.32 -0.92 l0 2.2 z M82.96000000000001 35.24 c0.76 0 0.84 0.76 0.28 1.64 c-1.64 2.4 -3.8 3.52 -7.08 3.52 c-5.84 0 -10.76 -3.64 -10.76 -10.6 c0 -6.84 5.24 -10.16 10.04 -10.16 c5.8 0 9.12 4.12 9.12 7.96 c0 2.12 -0.88 3.52 -3.12 3.52 l-9.08 0 c0.16 3.04 0.52 7.24 4.68 7.24 c2.24 0 3.48 -0.88 4.52 -2.52 c0.28 -0.48 0.4 -0.6 0.96 -0.6 l0.44 0 z M77.92 28.6 c0 -4.28 -0.56 -6.88 -2.56 -6.88 c-2.16 0 -2.96 2.56 -3 6.88 l5.56 0 z M104.48 26.64 c5.36 1.16 7.2 3.44 7.2 6.48 c0 4.56 -3.96 6.88 -12.04 6.88 l-13.28 0 l0 -2.04 c2.32 -0.16 3 -0.44 3 -1.44 l0 -18.2 c0 -0.88 -0.84 -1.04 -2.6 -1.16 l0 -2 c4.28 0.16 8.36 0 10.12 0 c9.48 0 12.2 2.8 12.2 6.4 c0 1.96 -1.32 4.12 -4.6 5.08 z M96.84 17.2 l0 9.12 c4.04 -0.8 5.48 -2 5.48 -4.76 s-1.04 -4.4 -3.88 -4.4 c-0.68 0 -1.12 0 -1.6 0.04 z M99.68 37.76 c2.6 0 4.56 -1.12 4.56 -4.76 c0 -3.24 -1.24 -4.92 -5.36 -4.92 l-2.04 0.4 l0 7.8 c0 1 0.12 1.48 1.8 1.48 l1.04 0 z M135.48 34.08 c0 1.6 1.12 1.96 2.68 1.6 l0 1.92 c-4.64 1.2 -7.4 2.96 -8.2 2.96 c-1.24 0 -1.84 -0.84 -1.68 -2.24 l0.48 -2.56 c-0.96 1.72 -3 4.96 -7 4.96 c-2.96 0 -6.56 -1.44 -6.56 -7.24 l0 -10.04 c0 -0.8 -0.32 -1.2 -1.12 -1.16 l-1.2 0.04 l0 -2 l8.16 -0.52 c0.64 -0.04 1.32 0.36 1.32 1.24 l0 11.6 c0 2.56 -0.32 4.96 1.72 4.96 s3.84 -3.92 4.28 -5.04 l0 -9.12 c0 -0.8 -0.4 -1.2 -1.2 -1.16 l-1.12 0.04 l0 -2 l8.12 -0.52 c0.56 -0.04 1.32 0.36 1.32 1.24 l0 13.04 z M155.48 19.56 c1.88 0 3.48 1.28 3.48 3.28 c0 2.2 -1.96 3 -3.04 3 c-1.76 0 -2.72 -0.92 -3.64 -0.92 c-2.52 0 -2.72 2.76 -2.92 4.08 l0 7.48 c0 1 1 1.32 2.72 1.48 l0 2.04 c-4.12 -0.08 -8.32 -0.08 -12.44 0 l0 -2.04 c1.44 -0.16 2.52 -0.48 2.52 -1.48 l0 -10.08 c0 -1.64 -1.12 -1.88 -2.6 -1.6 l0 -2.04 c4.88 -1.08 7.08 -3.44 8.36 -3.44 c1.16 0 1.6 0.76 1.44 2.08 l-0.6 4.36 c1.48 -4.56 3.68 -6.2 6.72 -6.2 z M177.16 34.24 c0 3.76 -3.84 6.4 -7.4 6.4 c-2.96 0 -5 -1.56 -5.72 -1.56 c-0.36 0 -0.56 0.16 -0.56 0.88 l-2.12 0 l-0.52 -5.8 l1.24 0 c0.76 0 1.08 0.2 1.4 0.92 c0.84 2.04 3.12 3.64 5.32 3.64 c1.52 0 2.48 -0.92 2.48 -2.12 c0 -1.64 -1.44 -2.44 -3.24 -3.16 c-2.4 -1 -7.48 -2.84 -7.48 -7.48 c0 -4.04 3.36 -6.32 7.12 -6.32 c3 0 3.88 1.12 4.76 1.12 c0.68 0 0.92 -0.36 0.96 -0.8 l2.12 0 l0.36 5.92 l-1.08 0 c-0.72 0 -1.36 -0.16 -1.64 -0.96 c-0.88 -2.52 -2.44 -3.4 -4.24 -3.4 c-1.28 0 -2.6 0.76 -2.6 2.24 c0 1.56 1.52 2.36 3.32 3 c2.28 0.92 7.52 2.92 7.52 7.48 z M192.07999999999998 38.96 c-1.12 0.84 -2.72 1.32 -4.6 1.32 c-4.2 0 -6.64 -2.32 -6.64 -6.96 l0 -11.16 l-1.4 0 c-0.52 0 -0.68 -0.24 -0.68 -0.76 l0 -0.68 c0 -0.52 0.16 -0.76 0.68 -0.76 c3.44 0 4.8 -2.44 5.12 -5.44 l3.44 0 l0 5.44 l3.32 0 c0.52 0 0.68 0.24 0.68 0.76 l0 0.68 c0 0.52 -0.16 0.76 -0.68 0.76 l-3.32 0 l0 11.92 c0 2.08 0.12 3.6 1.76 3.6 c0.64 0 1.64 -0.32 2.32 -0.92 l0 2.2 z"></path></g></svg></Link>
        <div className='btnGroup'>
          {
            userInfo?.name && 
            <div className='uploadButton' onClick={open} >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16,2H8C4.691,2,2,4.691,2,8v13c0,0.553,0.447,1,1,1h13c3.309,0,6-2.691,6-6V8C22,4.691,19.309,2,16,2z M20,16 c0,2.206-1.794,4-4,4H4V8c0-2.206,1.794-4,4-4h8c2.206,0,4,1.794,4,4V16z"></path><path d="M13 7L11 7 11 11 7 11 7 13 11 13 11 17 13 17 13 13 17 13 17 11 13 11z"></path></svg>
               Post
            </div>
          }
        {
          userInfo?.name ?
          <Menu withArrow>
          <Menu.Target>
            <UserButton
              image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              name={userInfo?.name}
              email={userInfo?.email}
            />
          </Menu.Target>
          <Menu.Dropdown>
         
          <Menu.Item leftSection={<IconLogout style={{ width: '1rem', height:'1rem' }} />} onClick={() => performLogOutAction()}>
          Logout
        </Menu.Item>
          </Menu.Dropdown>
        </Menu>
          :
          <div className='uploadButton' onClick={() => navigate('/login')} style={{marginLeft: '10px'}}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path></svg>
            Login
            </div>
        }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      postList: state?.getPostReducers?.data,
      savePostResponse: state?.setPostReducers.data,
      userInfo: state?.loginReducer?.user?.data
    }
  }
  
  const mapDisPatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        getPostList,
        setPostAction,
        userDetails,
        performLogOutAction
      },
      dispatch
    )
  }

export default connect(mapStateToProps, mapDisPatchToProps) (Navbar)
