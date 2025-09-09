'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/hearder';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScheduleItem {
  id: number;
  description: string;
  start_time: string;
  end_time: string;
  place?: {
    id: number;
    name: string;
    image_url?: string;
  };
}

interface Schedule {
  id: number;
  title: string;
  day: string;
  items: ScheduleItem[];
}

export default function RoteiroPage() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  // Simulação: depois você troca pelo fetch da API /schedules/{user_id}
  useEffect(() => {
    const fakeSchedule: Schedule = {
      id: 1,
      title: 'Roteiro Brasília - Dia 10/09',
      day: '2025-09-10',
      items: [
        {
          id: 1,
          description: 'Café da manhã no hotel',
          start_time: '08:00',
          end_time: '08:30',
        },
        {
          id: 2,
          description: 'Visita ao Congresso Nacional',
          start_time: '09:00',
          end_time: '10:30',
          place: {
            id: 1,
            name: 'Congresso Nacional',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Congresso_Nacional.jpg',
          },
        },
        {
          id: 3,
          description: 'Museu Nacional da República',
          start_time: '11:00',
          end_time: '12:30',
          place: {
            id: 2,
            name: 'Museu Nacional',
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Museu_Nacional_da_Rep%C3%BAblica_2.jpg',
          },
        },
      ],
    };

    setSchedule(fakeSchedule);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        {!schedule ? (
          <p className="text-center text-muted-foreground">Carregando roteiro...</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">{schedule.title}</h1>
            <p className="text-center text-muted-foreground mb-8">
              Dia: {new Date(schedule.day).toLocaleDateString('pt-BR')}
            </p>

            <div className="space-y-6">
              {schedule.items.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 flex gap-4 items-start border-l-4 border-primary shadow-sm"
                >
                  <div className="min-w-[80px] text-sm font-semibold text-primary">
                    {item.start_time} - {item.end_time}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.description}</h2>
                    {item.place && (
                      <>
                        <p className="text-sm text-muted-foreground mb-2">
                          Local: {item.place.name}
                        </p>
                        {item.place.image_url && (
                          <img
                            src={item.place.image_url}
                            alt={item.place.name}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        )}
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button>Compartilhar Roteiro</Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}