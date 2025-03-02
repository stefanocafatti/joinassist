
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="bg-white py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Assist and how our platform works.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium py-4 text-left">
                How does Assist ensure the quality of student assistants?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                We have a rigorous vetting process for all students who join our platform. This includes verification of their college enrollment, background checks, skill assessments, and an interview process. We also maintain a rating system so you can review past performance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium py-4 text-left">
                What happens if I'm not satisfied with the service?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                We have a satisfaction guarantee policy. If you're not completely satisfied with the service provided, please contact our support team within 24 hours of task completion, and we'll work to resolve the issue, which may include a partial or full refund depending on the situation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium py-4 text-left">
                How much does it cost to use Assist?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                Pricing varies based on the type of task, complexity, and duration. When you post a task, you can either set your budget or request quotes from available students. We charge a small service fee to maintain the platform and ensure quality service.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium py-4 text-left">
                How quickly can I find someone to help with my task?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                In busy college areas, you can often find help within hours. For specialized tasks or during off-peak times, it might take a day or two. Our platform shows you estimated response times based on your location and task type.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium py-4 text-left">
                Can I hire the same student assistant again for future tasks?
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1 text-gray-600">
                Absolutely! If you've had a positive experience with a particular student, you can add them to your favorites and request them specifically for future tasks. Many of our users build ongoing relationships with their preferred assistants.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
