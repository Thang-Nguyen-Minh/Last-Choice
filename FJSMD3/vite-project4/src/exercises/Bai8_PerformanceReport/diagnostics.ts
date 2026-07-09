export function getDiagnosticMatrix(keystrokes: number) {
  return [
    { library: 'Formik', architecture: 'Controlled', renders: keystrokes + 1 },
    { library: 'React Hook Form', architecture: 'Uncontrolled', renders: 1 },
  ]
}
