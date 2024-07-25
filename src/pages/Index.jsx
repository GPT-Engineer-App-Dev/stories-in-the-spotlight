import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ExternalLink } from 'lucide-react';

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
        const data = await response.json();
        setStories(data.hits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Top 100 Hacker News Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader className="h-6 bg-gray-200 rounded"></CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <Card key={story.objectID}>
              <CardHeader className="font-semibold">{story.title}</CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">Upvotes: {story.points}</p>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline inline-flex items-center"
                >
                  Read more <ExternalLink className="ml-1 w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;