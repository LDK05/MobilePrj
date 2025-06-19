
export async function fetchContactData() {
  const soapEnvelope = `
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetAllPeoples xmlns="http://tempuri.org/" />
          </soap:Body>
        </soap:Envelope>
    `;

  const response = await fetch('https://localhost:44382/ROIWebService.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': '"http://tempuri.org/GetAllPeoples"'
    },
    body: soapEnvelope
  });

  const xmlText = await response.text();

  // Parse the SOAP response to extract the result
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  // Adjust the tag names and namespaces as needed for your response
  const peopleNodes = xmlDoc.getElementsByTagName("Person");
  const people = [];
  for (let i = 0; i < peopleNodes.length; i++) {
    const person = peopleNodes[i];
    people.push({
      id: parseInt(person.getElementsByTagName("Id")[0]?.textContent || "0"),
      name: person.getElementsByTagName("Name")[0]?.textContent || "",
      phone: person.getElementsByTagName("Phone")[0]?.textContent || "",
      department: parseInt(person.getElementsByTagName("Dept")[0]?.textContent || "0"),
      address: [
        person.getElementsByTagName("AddrSt")[0]?.textContent || "",
        person.getElementsByTagName("AddrCity")[0]?.textContent || "",
        person.getElementsByTagName("AddrState")[0]?.textContent || "",
        person.getElementsByTagName("AddZIP")[0]?.textContent || "",
        person.getElementsByTagName("AddrCountry")[0]?.textContent || ""
      ].filter(Boolean).join(", ")
    });
  }
  return people;
}


export const addContact = async (person) => {
  const addressParts = person.address.split(", ");
  const address = {
    addrSt: addressParts[0] || "",
    addrCity: addressParts[1] || "",
    addrState: addressParts[2] || "",
    addrZip: addressParts[3] || "",
    addrCountry: addressParts[4] || ""
  };

  const soapEnvelope = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <AddNewPerson xmlns="http://tempuri.org/">
          <newPerson>
            <Name>${person.name}</Name>
            <Phone>${person.phone}</Phone>
            <Dept>${person.department}</Dept>
            <AddrSt>${address.addrSt}</AddrSt>
            <AddrCity>${address.addrCity}</AddrCity>
            <AddrState>${address.addrState}</AddrState>
            <AddZIP>${address.addrZip}</AddZIP>
            <AddrCountry>${address.addrCountry}</AddrCountry>
          </newPerson>
        </AddNewPerson>
      </soap:Body>
    </soap:Envelope>
  `;

  return fetch("https://localhost:44382/ROIWebService.asmx", {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "SOAPAction": '"http://tempuri.org/AddNewPerson"'
    },
    body: soapEnvelope
  });
};

export const editExistingContact = async (person) => {
  const addressParts = person.address.split(", ");
  const address = {
    addrSt: addressParts[0] || "",
    addrCity: addressParts[1] || "",
    addrState: addressParts[2] || "",
    addrZip: addressParts[3] || "",
    addrCountry: addressParts[4] || ""
  };

  const soapEnvelope = `
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                     xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <EditExitingPerson xmlns="http://tempuri.org/">
          <updatedPerson>
            <Id>${person.id}</Id>
            <Name>${person.name}</Name>
            <Phone>${person.phone}</Phone>
            <Dept>${person.department}</Dept>
            <AddrSt>${address.addrSt}</AddrSt>
            <AddrCity>${address.addrCity}</AddrCity>
            <AddrState>${address.addrState}</AddrState>
            <AddZIP>${address.addrZip}</AddZIP>
            <AddrCountry>${address.addrCountry}</AddrCountry>
          </updatedPerson>
        </EditExitingPerson>
      </soap12:Body>
    </soap12:Envelope>
  `;

  return fetch("https://localhost:44382/ROIWebService.asmx", {
    method: "POST",
    headers: {
      "Content-Type": "application/soap+xml; charset=utf-8"
    },
    body: soapEnvelope
  });
};

export const getDepartments = async () => {

  const soapEnvelope = `
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetAllDepartments xmlns="http://tempuri.org/" />
          </soap:Body>
        </soap:Envelope>
    `;

  const response = await fetch('https://localhost:44382/ROIWebService.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': '"http://tempuri.org/GetAllDepartments"'
    },
    body: soapEnvelope
  });

  const xmlText = await response.text();

  // Parse the SOAP response to extract the result
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  // Adjust the tag names and namespaces as needed for your response
  const deptNodes = xmlDoc.getElementsByTagName("Department");
  const departments = [];
  for (let i = 0; i < deptNodes.length; i++) {
    const dept = deptNodes[i];
    departments.push({
      id: parseInt(dept.getElementsByTagName("Id")[0]?.textContent || "0"),
      name: dept.getElementsByTagName("Name")[0]?.textContent || ""
    });
  }
  return departments;
};