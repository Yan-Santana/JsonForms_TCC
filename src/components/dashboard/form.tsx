import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Form() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Formulário</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Formulário</Label>
              <Input id="title" placeholder="Digite o título do formulário" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Digite uma descrição para o formulário"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schema">Schema JSON</Label>
              <Textarea
                id="schema"
                placeholder="Cole aqui o schema JSON do formulário"
                className="font-mono"
                rows={10}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Criar Formulário</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 